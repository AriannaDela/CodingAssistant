import ollama
from fastapi import UploadFile
from langchain_community.embeddings import OllamaEmbeddings

from utils import delete_collection_chromadb, init_collection_chromadb, load_files_from_uploadfile, \
    store_documents, get_collection_chromadb


async def load_documents_unit_test_to_vectordb(files: list[UploadFile]):
    delete_collection_chromadb(name="docs_content")

    # Initialize the ChromaDB collection
    docs_collection = init_collection_chromadb(name="docs_content")

    # Load the documents
    documents = await load_files_from_uploadfile(files)
    print("Loaded documents: " + str(len(documents)))

    # Create an Ollama embeddings object
    embeddings = OllamaEmbeddings(model="llama3")

    # Store the documents in the collection
    docs_collection = store_documents(documents=documents, collection=docs_collection, embeddings=embeddings)
    #
    # prompt = f"get all documents"
    # embedding_query = embeddings.embed_query(prompt)
    #
    # results = docs_collection.query(
    #     query_embeddings=[embedding_query],
    #     n_results=2
    # )

    # print("Results: " + str(results))


async def generate_tests_unit_test_to_vectordb(files: list[UploadFile]):
    # Load the documents
    documents = await load_files_from_uploadfile(files)
    source_code = documents[0]
    print("SOURCE CODE", source_code)

    # Initialize the ChromaDB collection
    docs_collection = get_collection_chromadb(name="docs_content")

    # Create an Ollama embeddings object
    embeddings = OllamaEmbeddings(model="llama3")

    # prompt = f"Retrieve code examples written in the same programming language as {source_code}"
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

    # key_example_elements = ollama.generate(model="llama3",
    #                                        prompt=f"Use this test : {data} to write a short guide that can help writing tests code")
    # example_elements_summary = key_example_elements["response"]

    output = ollama.generate(model="llama3",
                             options={"temperature": 0.0, "max_tokens": 10000},
                             prompt=f"You are an experienced developer. Generate result in MD format. Using the "
                                    f"documentation {documentation_summary}, "
                                    f"generate all test cases and unit tests (unit test must include code) related to "
                                    f"methods, function, classes of this source code: {source_code}. Don't write "
                                    f"something like Here are the test cases and unit tests in Markdown format. Space "
                                    f"between paragraphs and titles")

    return output

# def OLD_generate_unit_tests_from_files():
#     # Initialize the ChromaDB collection
#     docs_collection = init_collection_chromadb()
#
#     source_code = load_documents(file_path)[0]
#     code_documentation = load_documents(documentation_path)[0]
#
#     # Load the documents
#     documents = load_folder("test_example")
#
#     # Create an Ollama embeddings object
#     embeddings = OllamaEmbeddings(model="llama3")
#
#     # Store the documents in the collection
#     docs_collection = store_documents(documents=documents, collection=docs_collection, embeddings=embeddings)
#
#     prompt = f"Retrieve code examples written in the same programming language as {source_code}"
#     embedding_query = embeddings.embed_query(prompt)
#
#     results = docs_collection.query(
#         query_embeddings=[embedding_query],
#         n_results=2
#     )
#     data = results['documents'][0]
#
#     key_documentation_elements = ollama.generate(model="llama3",
#                                                  prompt=f"Generate a short summary as a text of this documentation: {code_documentation}")
#     documentation_summary = key_documentation_elements["response"]
#
#     key_example_elements = ollama.generate(model="llama3",
#                                            prompt=f"Use this test : {data} to write a short guide that can help writing tests code")
#     example_elements_summary = key_example_elements["response"]
#
#     #TODO: il risultato deve essere corretto anche se includo documentazioni e test examples
#     output = ollama.generate(model="llama3",
#                              prompt=f"Generate result in MD format. Using the documentation {documentation_summary} and {example_elements_summary} , generate all test cases and unit tests (unit test must include code) related to methods, function, classes of this source code: {source_code}.")
#     # f"Use this source code documentation to generate tests: {key_documentation_elements}")
#     # f"Some test code examples that can help learn the structure: {data}."
#     # f"Use this source code documentation to generate tests: {key_documentation_elements}")
#
#     save_output_to_md(output, 'documents/output.md')
