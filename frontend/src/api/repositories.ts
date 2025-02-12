import axios from "axios";
import Repository from "../models/repository";
import RemoteRepository from "../models/remoteRepository";

interface RepositorySearchResult {
  repository: Repository | null;
  remoteRepository: RemoteRepository | null;
}

export async function searchRepositoryByUrl(
  url: string
): Promise<RepositorySearchResult> {
  const response = await axios.get("/repositories/search", {
    params: { url: url },
  });
  const result: RepositorySearchResult = {
    repository: null,
    remoteRepository: null,
  };

  if (response.data.repository) {
    result.repository = {
      id: response.data.repository.id,
      name: response.data.repository.name,
      domain: response.data.repository.domain,
      path: response.data.repository.path,
      url: response.data.repository.url,
      createdAt: response.data.repository.created_at,
      updatedAt: response.data.repository.updated_at,
      last_synced_at: response.data.repository.last_synced_at,
    };
  }

  if (response.data.remote_repository) {
    result.remoteRepository = {
      name: response.data.remote_repository.name,
      description: response.data.remote_repository.description,
      domain: response.data.remote_repository.domain,
      path: response.data.remote_repository.path,
      url: response.data.remote_repository.url,
    };
  }

  return result;
}

export async function createRepositoryByUrl(url: string): Promise<Repository> {
  const response = await axios.post("/repositories", { url: url });
  const result: Repository = { ...response.data, url: url };

  return result;
}

export async function syncRepositoryById(id: number): Promise<Repository> {
  const response = await axios.post(`/repositories/${id}/sync`);
  const result: Repository = response.data;

  return result;
}

export async function getRepositoryById(id: number): Promise<Repository> {
  const response = await axios.get(`/repositories/${id}`);
  const result: Repository = { ...response.data };

  return result;
}
