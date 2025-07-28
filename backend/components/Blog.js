import axios from "axios";
import { useRouter } from "next/router";
import { useState, useMemo, forwardRef, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import React from "react";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: Quill } = await import("quill");
    const { default: ImageUploader } = await import("quill-image-uploader");

    await import("react-quill/dist/quill.snow.css");
    await import("quill-image-uploader/dist/quill.imageUploader.min.css");

    Quill.register("modules/imageUploader", ImageUploader);

    return function comp(props) {
      return <RQ {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dl2v0g0hy");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        resolve(response.data.secure_url);
      })
      .catch((error) => {
        reject("Image upload failed. Please try again.");
        console.error("Error uploading image: ", error);
      });
  });
};

const QuillWrapper = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <ReactQuill {...props} />
    </div>
  );
});

QuillWrapper.displayName = 'QuillWrapper';

const TiptapEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

// ErrorBoundary to catch editor errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log errorInfo here if needed
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: '1em' }}>Something went wrong in the editor: {this.state.error?.message || 'Unknown error'}</div>;
    }
    return this.props.children;
  }
}

export default function Blog({
  _id,
  title: existingTitle,
  description: existingDescription,
  slug: existingSlug,
  blogcategory: existingBlogcategory,
  body: existingBody,
  tags: existingTags,
  status: existingStatus,
  mainImage: existingMainImage,
  amazonLink: existingAmazonLink,
}) {
  const [redirect, setRedirect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const quillRef = useRef();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
  const [body, setBody] = useState(existingBody || "");
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || "");
  const [mainImage, setMainImage] = useState(existingMainImage || "");
  const [amazonLink, setAmazonLink] = useState(existingAmazonLink || "");

  // Slugify function to generate a URL-friendly slug from the title
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^a-z0-9-]/g, '') // Remove all non-alphanumeric chars except -
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+|-+$/g, ''); // Trim - from start/end
  }

  // Automatically update slug when title changes
  React.useEffect(() => {
    if (title) {
      setSlug(slugify(title));
    } else {
      setSlug("");
    }
  }, [title]);

  async function createProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      slug,
      body,
      blogcategory,
      tags,
      status,
      mainImage,
      amazonLink,
    };
    try {
      if (_id) {
        await axios.put("/api/blogapi", { ...data, _id });
      } else {
        await axios.post("/api/blogapi", data);
      }
      setShowSuccess(true);
      setTimeout(() => {
        setRedirect(true);
      }, 60000); // 1 minute
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  }

  if (redirect) {
    router.push("/");
    return null;
  }

  if (showSuccess) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        background: '#f7faff',
        borderRadius: '16px',
        boxShadow: '0 2px 16px rgba(42,60,255,0.07)',
        padding: '48px 24px',
        margin: '40px auto',
        maxWidth: '500px',
      }}>
        <div style={{ fontSize: '3rem', color: '#2a3cff', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ color: '#2a3cff', marginBottom: '12px' }}>Blog Published Successfully!</h2>
        <p style={{ color: '#333', fontSize: '1.1rem', marginBottom: '8px' }}>
          Your blog has been published and is now live.
        </p>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          You will be redirected to the blog page in <b>1 minute</b>.
        </p>
        <button
          style={{
            marginTop: '24px',
            background: '#2a3cff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(42,60,255,0.08)',
          }}
          onClick={() => setRedirect(true)}
        >
          Go to Blog Page Now
        </button>
      </div>
    );
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };

  const handleMainImageUpload = async (file) => {
    try {
      const imageUrl = await uploadImage(file);
      setMainImage(imageUrl);
    } catch (error) {
      console.error("Error uploading main image: ", error);
    }
  };

  const handleImageUrlInput = (url) => {
    setMainImage(url);
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          insertToEditor(imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  }, []);

  const insertToEditor = (url) => {
    if (quillRef.current) {
      const editor = quillRef.current.querySelector('.ql-editor');
      if (editor) {
        const range = document.getSelection().getRangeAt(0);
        const img = document.createElement('img');
        img.src = url;
        range.insertNode(img);
      }
    }
  };

  const handleImageUrl = () => {
    const url = prompt('Enter the image URL:');
    if (url && quillRef.current) {
      insertToEditor(url);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "imageUrl"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
          imageUrl: handleImageUrl,
        },
      },
      imageUploader: {
        upload: uploadImage,
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <form className="addWebsiteform" onSubmit={createProduct}>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="mainImage">Main Image</label>
        <input
          type="file"
          id="mainImage"
          onChange={(e) => handleMainImageUpload(e.target.files[0])}
          accept="image/*"
        />
        <input
          type="text"
          placeholder="Or enter image URL"
          onChange={(e) => handleImageUrlInput(e.target.value)}
        />
        {mainImage && (
          <img
            src={mainImage}
            alt="Main blog image"
            style={{ maxWidth: "100%", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter small title "
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="title">Description</label>
        <input
          type="text"
          value={description}
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter small Description "
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={e => setSlug(slugify(e.target.value))}
          placeholder="Enter slug url"
          required
          readOnly
        />
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          multiple
          value={blogcategory}
          onChange={(e) =>
            setBlogcategory(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="best-products">Best Products</option>
          <option value="earphones">Earphones</option>
          <option value="pantry">Pantry</option>
          <option value="luggage">Luggage</option>
          <option value="electronics">Electronics</option>
          <option value="womens-clothing">Women's Clothing</option>
          <option value="home-appliances">Home Appliances</option>
          <option value="mens-clothing">Men's Clothing</option>
        </select>
        <div className="selected-labels flex gap-1 mt-1 mb-1">
          {Array.isArray(blogcategory) && blogcategory.length > 0 ? (
            blogcategory.map((category) => (
              <span key={category} style={{
                background: '#e3e8ff',
                color: '#2a3cff',
                borderRadius: '12px',
                padding: '2px 10px',
                fontSize: '0.95em',
                marginRight: '4px',
                display: 'inline-block',
              }}>{category}</span>
            ))
          ) : (
            <span style={{ color: '#888' }}>No category selected</span>
          )}
        </div>
      </div>
      {/* Amazon Link input */}
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="amazonLink">Amazon Link</label>
        <input
          type="text"
          id="amazonLink"
          value={amazonLink}
          onChange={(e) => setAmazonLink(e.target.value)}
          placeholder="Enter Amazon product URL (optional)"
        />
      </div>
      <div className="body w-100 flex flex-col flex-left mb-2" style={{width: '100%', maxWidth: '1200px', margin: '0 auto'}}>
        <label htmlFor="body">Blog Content</label>
        <ErrorBoundary>
          <TiptapEditor value={body} onChange={setBody} />
        </ErrorBoundary>
      </div>
      <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
        <label htmlFor="tags">Tags</label>
        <select
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) =>
            setTags(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          multiple
        >
          <option value="review">Review</option>
          <option value="comparison">Comparison</option>
          <option value="budget">Budget</option>
          <option value="premium">Premium</option>
          <option value="newrelease">New Release</option>
          <option value="howto">How-To</option>
          <option value="tips">Tips & Tricks</option>
          <option value="accessories">Accessories</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
          <option value="gaming">Gaming</option>
          <option value="productivity">Productivity</option>
          <option value="security">Security</option>
        </select>
        <div className="selected-labels flex gap-1 mt-1 mb-1">
          {Array.isArray(tags) && tags.length > 0 ? (
            tags.map((tag) => (
              <span key={tag} style={{
                background: '#e3e8ff',
                color: '#2a3cff',
                borderRadius: '12px',
                padding: '2px 10px',
                fontSize: '0.95em',
                marginRight: '4px',
                display: 'inline-block',
              }}>{tag}</span>
            ))
          ) : (
            <span style={{ color: '#888' }}>No tag selected</span>
          )}
        </div>
      </div>
      <div className="w-100 flex flex-col flex-left mb-2">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">No select</option>
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
        </select>
        <p className="existingcategory flex gap-1 mt-1 mb-1">
          selected: <span>{status}</span>
        </p>
      </div>
      <div className="w-100 mb-2">
        <button type="submit" className="w-100 addwebbtn flex-center">
          Save Blog
        </button>
      </div>
    </form>
  );
}
