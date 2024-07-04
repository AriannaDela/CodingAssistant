import glob
import os
from typing import List
import chromadb
from fastapi import UploadFile


def init_collection_chromadb(name: str) -> chromadb.Collection:
    chromadb_client = chromadb.Client()
    if chromadb_client:
        print("ChromaDB client connection successful.")

    return chromadb_client.create_collection(name=name)


def get_collection_chromadb(name: str) -> chromadb.Collection:
    chromadb_client = chromadb.Client()
    if chromadb_client:
        print("ChromaDB client connection successful.")
    try:
        return chromadb_client.get_collection(name=name)
    except:
        return init_collection_chromadb(name=name)


def delete_collection_chromadb(name: str):
    try:
        chromadb_client = chromadb.Client()
        if chromadb_client:
            print("ChromaDB client connection successful.")

        return chromadb_client.delete_collection(name=name)
    except:
        print("Collection not existing")


def load_documents(file_path):
    documents = []
    with open(file_path, 'r') as file:
        documents.append(file.read())
    return documents


def load_folder(folder_path):
    documents = []
    for doc_path in glob.glob(os.path.join(folder_path, '*')):
        with open(doc_path, 'r') as file:
            documents.append(file.read())
    return documents


async def load_files_from_uploadfile(files: List[UploadFile]) -> List[str]:
    documents = []
    for file in files:
        content = await file.read()
        documents.append(content.decode('utf-8'))
        await file.close()
    return documents


def store_documents(documents, collection, embeddings):
    for doc in documents:
        embedding = embeddings.embed_query(doc)
        id_doc = documents.index(doc)
        collection.add(
            ids=[str(id_doc)],
            embeddings=embedding,
            documents=[doc]
        )
    return collection


def save_output_to_md(output, file_path_output):
    with open(file_path_output, 'w') as file:
        file.write(output['response'])
