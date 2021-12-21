export const genres = [
    {"_id":"61a4a85b5f0e862230ba5741","name":"Action"},
    {"_id":"61a4a85b5f0e862230ba5742","name":"Comedy"},
    {"_id":"61a4a85b5f0e862230ba5743","name":"Thriller"},
    {"_id":"61a4a85b5f0e862230ba5744","name":"Sci-fi"},
    {"_id":"61a4a85b5f0e862230ba5745","name":"Drama"}
];

export function getGenres(){
    return genres.filter(g=>g);
}