const ApplicationLogo = () => {
    return (
        <div className="flex space-x-2">
            <img src="/images/logo-letter.png" width="30" />
            <img
                src="/images/logo.svg"
                width="145"
                className="hidden sm:inline-block"
            />
        </div>
    );
};

export default ApplicationLogo;
