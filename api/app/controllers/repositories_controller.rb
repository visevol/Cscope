class RepositoriesController < ApplicationController
  def show
    repository = Repository.find_by(id: params[:id])

    if repository
      render(json: repository)
    else
      render(json: nil, status: :not_found)
    end
  end

  def create
    url = params.permit(:url).fetch(:url)

    repository = Repository.find_by_url(url)
    return render(json: repository, status: 200) if repository

    remote_repository = GithubService.new.fetch_remote_repository(url)
    unless remote_repository
      return render(json: { message: "remote repository does not exists." }, status: 404)
    end

    repository = Repository.from_remote_repository(remote_repository)
    if repository.save
      render(json: repository, status: 201)
    else
      render(json: { message: "could not create repository.", errors: repositoy.errors.full_messages }, status: 400)
    end
  end
end
