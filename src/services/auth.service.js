import { callService } from "@utils/handleApi";
class AuthService {
    constructor() {
        this.services = [
            {
                path: "/auth/login",
                method: "post",
                nameFunction: "handleLogin",
            },
            {
                path: "/auth/logout",
                method: "post",
                nameFunction: "handleLogout",
            },
        ];
    }

    async handleLogin(data) {
        const service = this.getService("handleLogin");
        if (!service) {
            throw new Error("Service 'handleLogin' not found");
        }
        const response = await callService(service, data, true);
        return response;
    }

    async handleLogout(data) {
        const service = this.getService("handleLogout");
        if (!service) {
            throw new Error("Service 'handleLogout' not found");
        }
        const response = await callService(service, data);
        return response;
    }

    /*
     * Support functions
     */
    getService(nameFunction) {
        return this.services.find(
            (service) => service.nameFunction === nameFunction,
        );
    }
}

export default AuthService;
