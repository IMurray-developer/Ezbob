export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
    }
    return await response.json();
};

export const fetchPostById = async (id: string) => {
    const response = await fetch(`https://dummyjson.com/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    const data = await response.json();
    return data;
};

export const fetchPosts = async (query: string, page: number, perPage: number) => {
    const response = await fetch(
        `https://dummyjson.com/posts/search?q=${query}&limit=${perPage}&skip=${(page - 1) * perPage}`
    );
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
};