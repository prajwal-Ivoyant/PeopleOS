import { SignUpForm } from "prajwal-storybook-ui";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

function SignUPPage() {
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
                <SignUpForm onSubmit={() => navigate('/login')}></SignUpForm>
            </div>
        </Layout>
    );
}

export default SignUPPage;