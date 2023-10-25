## Getting Started

1. First, 

2. Then, create a folder in the root directory called "llama", and add 

3. Now run `pnpm install`. 

4. (Optional) If you want to enable CUDA to speed up Llama 2, run the following command:

```bash
pnpm dlx node-llama-cpp download --cuda
```

For this to work, you must have the CUDA toolkit installed, [cmake-js dependencies](https://github.com/cmake-js/cmake-js#:~:text=projectRoot/build%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5Bstring%5D-,Requirements%3A,-CMake) and CMake version 3.26 or higher. 

For this to work for me on Windows, I had to modify the `compileLlamaCpp.js` file in the `node-llama-cpp` package. I had to change:

```js
if (cuda && process.env.CUDA_PATH != null && await fs.pathExists(process.env.CUDA_PATH))
            cmakeCustomOptions.push("CMAKE_GENERATOR_TOOLSET=" + process.env.CUDA_PATH);
```

to this:

```js
if (cuda && process.env.CUDA_PATH != null && await fs.pathExists(process.env.CUDA_PATH))
            cmakeCustomOptions.push("CMAKE_VS_PLATFORM_TOOLSET_CUDA=" + process.env.CUDA_PATH);
```


To see more information on how to install Cuda and to check other requirements, see [the official docs for `node-llama-cpp`](https://withcatai.github.io/node-llama-cpp/guide/CUDA).

5. Now, you can run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The API route to interact with Llama 2 is at `/api/chat`.

