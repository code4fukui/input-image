# input-image

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A zero-dependency custom HTML element for uploading, resizing, and previewing images.


![A user interface showing three square image previews in a row. Each preview contains a different uploaded image. Below the previews is a text field displaying the comma-separated URLs of the uploaded images.](https://user-images.githubusercontent.com/57882/235284190-2581628e-8a5c-4034-9721-a4729f22588c.png)


## Features

-   **Single or Multiple File Uploads**: Configure to accept one or many files.
-   **Client-Side Image Resizing**: Automatically resizes images to a configurable max width before uploading to save bandwidth.
-   **Image Previews**: Displays a preview of each uploaded image.
-   **Form-Friendly**: Includes a hidden `<input>` that stores a comma-separated list of uploaded file URLs, ready for form submission.
-   **Non-Image Support**: Handles non-image file types by uploading them directly and displaying their URL.
-   **Easy Management**: A "Delete" button allows users to clear all uploaded files at once.
-   **Dynamic Control**: Programmatically get or set the image URLs using JavaScript.

## Usage

1.  **Import the component**

    Add the script to your HTML file. As it's an ES module, use `type="module"`.

    ```html
    <script type="module" src="./input-image.js"></script>
    ```

2.  **Add the element to your HTML**

    Use the `<input-image>` tag with the desired attributes. It works well inside a `<form>`.

    ```html
    <form id="my-form">
      <input-image
        id="image-uploader"
        name="image_urls"
        uploadurl="https://your-server.com/upload"
        accept="image/*"
        multiple
        maxwidth="1024"
        maxsize="2MB"
      ></input-image>
      <button type="submit">Submit</button>
    </form>
    ```

## API Reference

### Attributes

-   `name`: The `name` for the hidden `<input>` field, which will contain the comma-separated URLs.
-   `uploadurl`: **(Required)** The server endpoint URL where files will be POSTed.
-   `accept`: The file types to accept (e.g., `"image/*"`, `".jpg,.png"`). Passed to the underlying file input.
-   `multiple`: If present, allows multiple file selection.
-   `maxwidth`: The maximum width in pixels for image resizing. Defaults to `1220`.
-   `maxsize`: The maximum file size (e.g., `"5MB"`, `"1024KB"`). Defaults to `"3MB"`.

### JavaScript Properties & Events

You can interact with the element using standard DOM methods.

-   **`.value`**

    Gets or sets the comma-separated string of image URLs.

    ```javascript
    const uploader = document.getElementById('image-uploader');

    // Get the current URLs
    const imageUrls = uploader.value; // "url1.jpg,url2.png"

    // Set images to display initially
    uploader.value = "https://example.com/image1.jpg,https://example.com/image2.png";
    ```

-   **`.onupload`**

    An event handler that fires after all selected files have been processed and uploaded.

    ```javascript
    const uploader = document.getElementById('image-uploader');

    uploader.onupload = (event) => {
      console.log('All files have been uploaded!');
      // event.target is the <input-image> element itself
      console.log('Final URLs:', event.target.value);
    };
    ```

## License

MIT License — see [LICENSE](LICENSE).