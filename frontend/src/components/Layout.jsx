import Sidebar from "./SideBar";

function Layout({children}){

    return  (
        <div>
        <Sidebar></Sidebar>
        <div>
            {children}
        </div>
        </div>
    )
}

export default Layout;
