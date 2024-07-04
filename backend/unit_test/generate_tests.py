import ollama
from fastapi import UploadFile
from langchain_community.embeddings import OllamaEmbeddings

from utils import delete_collection_chromadb, init_collection_chromadb, load_files_from_uploadfile, \
    store_documents, get_collection_chromadb


async def load_documents_unit_test_to_vectordb(files: list[UploadFile]):
    delete_collection_chromadb(name="docs_content")

    docs_collection = init_collection_chromadb(name="docs_content")

    documents = await load_files_from_uploadfile(files)
    print("Loaded documents: " + str(len(documents)))

    embeddings = OllamaEmbeddings(model="llama3")

    docs_collection = store_documents(documents=documents, collection=docs_collection, embeddings=embeddings)


async def generate_tests_unit_test_to_vectordb(files: list[UploadFile]):
    documents = await load_files_from_uploadfile(files)
    source_code = documents[0]
    print("SOURCE CODE", source_code)

    docs_collection = get_collection_chromadb(name="docs_content")

    embeddings = OllamaEmbeddings(model="llama3")

    prompt = f"Retrieve all the documentation related to {source_code}"

    embedding_query = embeddings.embed_query(prompt)

    results = docs_collection.query(
        query_embeddings=[embedding_query],
        n_results=5
    )
    data = results['documents']

    key_documentation_elements = ollama.generate(model="llama3",
                                                 prompt=f"Generate a short summary as a text of this documentation: {data}")
    documentation_summary = key_documentation_elements["response"]

    output = ollama.generate(model="llama3",
                             options={"temperature": 0.0, "max_tokens": 10000},
                             prompt=f"You are an experienced developer. Generate result in MD format. Using the "
                                    f"documentation {documentation_summary}, "
                                    f"generate all test cases and unit tests (unit test must include code) related to "
                                    f"methods, function, classes of this source code: {source_code}. Don't write "
                                    f"something like Here are the test cases and unit tests in Markdown format. Space "
                                    f"between paragraphs and titles")

    return output
