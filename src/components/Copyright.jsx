import logo from "@assets/merkulove.png";

const Copyright = () => {
    return (
        <div className="flex flex-col items-center text-[10px] tracking-[0.7px] gap-2.5 sm:flex-row sm:justify-between">
            <p>Copyright © {new Date().getFullYear()} By DoctorQ</p>
        </div>
    );
};

export default Copyright;
