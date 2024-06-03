export const copyURL = async (id: string) => {
    await navigator.clipboard.writeText(`http://localhost:3000/dashboard/${id}`);
    alert('Copied classroom link!');
  };
  
  export const getYoutubeId = (youtube_link: string, setState: any, state: any) => {
    const match = youtube_link.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|.*[&?])v=)([^&?]+)/
    );
    const extractedVideoId = match ? match[1] : null;
  
    if (extractedVideoId) {
      setState({ ...state, youtubeID: extractedVideoId });
    } else {
      alert('Invalid video link');
    }
  };
  
  export const getGithubRepo = async (owner: string, repo: string, setState: any, state: any) => {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        alert('Something went wrong, try again!');
        throw new Error('API request failed');
      }
  
      const repoInfo = await response.json();
      const githubContent: {
        repo_url: string;
        name: string;
        language?: string;
        clone_url: string;
        description?: string;
      } = {
        repo_url: repoInfo?.html_url,
        name: repoInfo?.full_name,
        clone_url: repoInfo?.clone_url,
      };
  
      if (repoInfo?.description !== null) {
        githubContent.description = repoInfo?.description;
      }
  
      if (repoInfo?.language !== null) {
        githubContent.language = repoInfo?.language;
      }
  
      setState({ ...state, github_content: githubContent });
    } catch (error) {
      throw new Error('Error fetching repository information');
    }
  };
  
  export const getSketchfabModel = async (model_url: string, setState: any, state: any) => {
    const apiUrl = `https://sketchfab.com/oembed?url=${model_url}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        alert('Something went wrong, try again!');
        throw new Error('API request failed');
      }
  
      const modelInfo = await response.json();
  
      setState({
        ...state,
        sketchfab: {
          name: modelInfo?.title,
          html: modelInfo?.html,
        },
      });
    } catch (error) {
      throw new Error('Error fetching model information');
    }
  };
  