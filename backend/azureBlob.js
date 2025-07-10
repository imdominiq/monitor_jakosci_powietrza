import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import dotenv from 'dotenv';
dotenv.config();

const containerName = process.env.AZURE_STORAGE_CONTAINER;

const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT,
  process.env.AZURE_STORAGE_KEY
);

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
  sharedKeyCredential
);

export async function getLatestJsonBlobs() {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobs = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    if (blob.name.endsWith('.json')) {
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      const downloadBlockBlobResponse = await blockBlobClient.download();
      const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
      blobs.push(JSON.parse(downloaded));
    }
  }

  return blobs;
}

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    stream.on('error', reject);
  });
}