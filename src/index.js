import { ConfigProvider } from "antd"
import ReactDom from "react-dom";
import { HashRouter } from "react-router-dom"
import "lib-flexible"
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import App from "./App"

ReactDom.render(
    <ConfigProvider locale={zh_CN} direction="ltr" csp={{ nonce: 'YourNonceCode' }}>
        <HashRouter>
            <App/>
        </HashRouter>
    </ConfigProvider>,
    document.getElementById('root')
)
