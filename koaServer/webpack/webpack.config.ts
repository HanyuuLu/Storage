import * as path from 'path';
import * as StartServerPlugin from "start-server-webpack-plugin";
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import { Configuration, ExternalsElement } from 'webpack';

class WebpackConfig implements Configuration
{
    // node环境
    target: Configuration['target'] = "node";
    // 默认为发布环境
    mode: Configuration['mode'] = 'production';
    // 入口文件
    entry = [path.resolve(__dirname, '../src/main.ts')];
    output = {
        path: path.resolve(__dirname, '../dist'),
        filename: "server.js"
    };
    // 这里为开发环境留空
    externals: ExternalsElement[] = [];
    // loader们
    module = {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    }
                ],
                exclude: /node_modules/
            },
        ]
    };
    resolve = {
        extensions: [".ts", ".js", ".json"],
    };
    // 开发环境也使用NoEmitOnErrorsPlugin
    plugins = [new webpack.NoEmitOnErrorsPlugin()];
    constructor(mode: Configuration['mode'])
    {
        // 配置mode，production情况下用上边的默认配置就ok了。
        this.mode = mode;
        if (mode === 'development')
        {
            // 添加webpack/hot/signal,用来热更新
            this.entry.push('webpack/hot/signal');
            this.externals.push(
                // 添加webpack/hot/signal,用来热更新
                nodeExternals({
                    whitelist: ['webpack/hot/signal']
                })
            );
            const devPlugins = [
                // 用来热更新
                new webpack.HotModuleReplacementPlugin(),
                // 启动服务
                new StartServerPlugin({
                    // 启动的文件
                    name: 'server.js',
                    // 开启signal模式的热加载
                    signal: true,
                    // 为调试留接口
                    nodeArgs: ['--inspect']
                }),
            ]
            this.plugins.push(...devPlugins);
        }
    }
}

export default WebpackConfig;