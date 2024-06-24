import router from "../../router/IndexRouter";
import { Button, Checkbox, Form, Input } from "antd";
import "./Login.scss";

export default function Login() {
  // 通过校验
  const onFinish = (values) => {
    console.log("Success:", values);
    router.navigate("/system");
  };
  // 校验失败
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入账号!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 30 }}
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
