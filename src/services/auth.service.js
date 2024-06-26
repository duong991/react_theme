import { callService } from "@utils/handleApi";
class AuthService {
    /**
     * AuthService class constructor.
     *
     * The constructor initializes the `services` property,
     * which is an array of objects. Each object in the array
     * represents a service and has the following properties:
     * - `path`: The path of the service.
     * - `method`: The HTTP method to use for the service.
     * - `nameFunction`: The name of the function to handle the service.
     */
    constructor() {
        /**
         * An array of objects representing the services.
         * @type {Array.<Object>}
         */
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

    /**
     * Handles the login process.
     *
     * @param {Object} data - The data to send to the server.
     * @return {Promise} A promise that resolves to the server's response.
     * @throws {Error} If the 'handleLogin' service is not found.
     */
    async handleLogin(data) {
        const service = this.getService("handleLogin");

        if (!service) {
            throw new Error("Service 'handleLogin' not found");
        }

        const response = await callService(service, data, true);
        return response;
    }

    /**
     * Handles the logout process.
     *
     * @param {Object} data - The data to send to the server.
     * @return {Promise} A promise that resolves to the server's response.
     * @throws {Error} If the 'handleLogout' service is not found.
     */
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
