import { Login } from "prajwal-storybook-ui";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

function LoginPage() {
    const navigate = useNavigate();

    return (
        <Layout
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div style={{ width: "400px" }}>
                <Login onSubmit={() => navigate("/")} />
            </div>
        </Layout>
    );
}

export default LoginPage;