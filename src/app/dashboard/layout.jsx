

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen bg-black">
 
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;