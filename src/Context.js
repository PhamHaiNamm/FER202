import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [phimHot, setPhimHot] = useState([]);
    const [phimLe, setPhimLe] = useState([]);
    const [phimBo, setPhimBo] = useState([]);
    const [phimMoi, setPhimMoi] = useState([]);
    const [phimHay, setPhimHay] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [pick, setPick] = useState("");
    const [get, setGet] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hot, le, bo, moi, hay, all] = await Promise.all([
                    fetch("http://localhost:9999/phimHot").then(res => res.json()),
                    fetch("http://localhost:9999/phimLe").then(res => res.json()),
                    fetch("http://localhost:9999/phimBo").then(res => res.json()),
                    fetch("http://localhost:9999/phimMoi").then(res => res.json()),
                    fetch("http://localhost:9999/phimHay").then(res => res.json()),
                    fetch("http://localhost:9999/allMovie").then(res => res.json()),
                ]);
                setPhimHot(hot);
                setPhimLe(le);
                setPhimBo(bo);
                setPhimMoi(moi);
                setPhimHay(hay);
                setAllMovies(all);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    // Thêm phim mới
    const addMovie = async (newMovie) => {
        try {
            const response = await fetch("http://localhost:9999/allMovie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMovie),
            });

            if (!response.ok) throw new Error("Lỗi khi thêm phim");
            
            const addedMovie = await response.json();
            setAllMovies([...allMovies, addedMovie]);
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    // Sửa thông tin phim
    const editMovie = async (id, updatedMovie) => {
        try {
            const response = await fetch(`http://localhost:9999/allMovie/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMovie),
            });

            if (!response.ok) throw new Error("Lỗi khi cập nhật phim");

            setAllMovies(allMovies.map(movie => (movie.id === id ? updatedMovie : movie)));
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    // Xóa phim
    const deleteMovie = async (id) => {
        try {
            const response = await fetch(`http://localhost:9999/allMovie/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Lỗi khi xóa phim");

            setAllMovies(allMovies.filter(movie => movie.id !== id));
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    const data = {
        phimHot, phimLe, phimBo, phimMoi, phimHay, allMovies, search, pick, get,
        setPhimHot, setPhimLe, setPhimBo, setPhimMoi, setPhimHay, setAllMovies, setSearch, setPick, setGet,
        addMovie, editMovie, deleteMovie
    };

    return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>;
};
