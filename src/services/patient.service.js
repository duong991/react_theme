import axiosInstance from "@config/api";

export const fetchListAppointments = async (data) => {
    try {
        const { startTime, endTime } = data;
        const response = await axiosInstance.get(
            `/appointments?startime=${startTime}&endtime=${endTime}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
