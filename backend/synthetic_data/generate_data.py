import ollama
import pprint as pp
from fastapi import UploadFile
from langchain_community.embeddings import OllamaEmbeddings

from utils import delete_collection_chromadb, init_collection_chromadb, load_files_from_uploadfile, \
    store_documents, get_collection_chromadb


async def load_documents_synthetic_data_to_vectordb(files: list[UploadFile]):
    delete_collection_chromadb(name="docs_synthetic_data")

    docs_collection = init_collection_chromadb(name="docs_synthetic_data")

    documents = await load_files_from_uploadfile(files)
    print("Loaded documents: " + str(len(documents)))

    embeddings = OllamaEmbeddings(model="llama3")

    docs_collection = store_documents(documents=documents, collection=docs_collection, embeddings=embeddings)


async def generate_data_synthetic_data_to_vectordb(query_string: str):

    docs_collection = get_collection_chromadb(name="docs_synthetic_data")
    embeddings = OllamaEmbeddings(model="llama3")
    prompt = f"Retrieve all the information about the structure and the distribution of the data found in this request: {query_string}"
    embedding_query = embeddings.embed_query(prompt)
    results = docs_collection.query(
        query_embeddings=[embedding_query],
        n_results=5
    )
    data = results['documents']
    distribution_elements = ollama.generate(model="llama3",
                                            prompt=f"From {data} get all the distribution of the data related to: {query_string}")
    distribution = distribution_elements["response"]
    description_elements = ollama.generate(model="llama3",
                                      prompt=f"From {data} get all the descriptions of the data related to: {query_string}")
    description = description_elements["response"]

    output = ollama.generate(model="llama3",
                             options={"temperature": 0.0, "max_tokens": 12000},
                             prompt=f"You are an experienced developer. Generate result in JSON format."
                                    f"Generate at least ten JSON objects that represent this request: {query_string}"
                                    f"only use the following data descriptions: {description},"
                                    f"and the distributions {distribution}. Don't write something like:"
                                    f"Here are ten JSON objects that represent a customer profile with its purchase "
                                    f"history in JSON format Write only valid JSON format. "
                                    f"Don't truncate JSON objects. Write all objexts, don't skip any. ")
    return output
