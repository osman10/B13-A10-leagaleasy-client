const Layout = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <aside className="w-64 h-full p-4 border-r border-gray-200">
          <p className="text-red-400 font-semibold">Sidebar</p>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;