import { useEffect, useState } from 'react';

export const useGithub = () => {
  const [isGithubUrl, setIsGithubUrl] = useState(false);
  const [repoUrl, setRepoUrl] = useState<string>();
  useEffect(() => {
    let elements = document.querySelectorAll(".cscope-extension");
    if(elements.length > 0){
      setIsGithubUrl(true);
    }
  }, []);

  useEffect(() => {
    if(isGithubUrl){
      setRepoUrl(document.location.href);
    }else{
      setRepoUrl(undefined);
    }
  }, [isGithubUrl]);
  
  return repoUrl;
};

