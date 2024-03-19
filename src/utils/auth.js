export const isAuthenticated = () => {
    const token = localStorage.getItem("accessToken");
    return !!token; // Trả về true nếu có token, ngược lại trả về false
};
