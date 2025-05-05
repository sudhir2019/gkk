import Footer from '../components/layoutsComponents/Home/Footer';
import Navbar from '../components/layoutsComponents/Home/Navbar';
import Home from '../pages/HomePages/Home';

function MainLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
            <Navbar />
            <main>
                <Home />
            </main >
            <Footer />
        </div>
    );
}

export default MainLayout;
