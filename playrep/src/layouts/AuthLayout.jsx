import { Outlet } from 'react-router-dom';
import Footer from "../components/layoutsComponents/Footer";
const AuthLayout = () => {

    return (
        <div className="gridContainer clearfix">
            <div id="LayoutDiv1">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default AuthLayout;