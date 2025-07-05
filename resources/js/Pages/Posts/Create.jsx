import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

export default function PostCreate() {
    const { auth } = usePage().props;
    const [previews, setPreviews] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        media: [],
    });
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        post(route("posts.store"), {
            onError: (errors) => {
                console.log(errors);
                toast.error(errors.message || "Something went wrong.");
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    useEffect(() => {
        const newPreviews = data.media.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));
        setPreviews(newPreviews);

        return () => {
            newPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [data.media]);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-plus-circle"></i>,
                title: "Create Post",
            }}
        >
            <Head title="Create" />

            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="flex flex-col flex-1 py-20 px-28"
            >
                <div className="border-b border-gray-300 p-4">
                    <h2 className="text-3xl text-gray-700">Create Post</h2>
                </div>
                <div className="flex flex-1">
                    <div className="flex flex-1 basis-3/12 justify-start flex-col border-r border-gray-300 py-4">
                        <div className="flex px-6">
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                placeholder="Title"
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-1 flex-col px-6 mt-4">
                            <Toolbar setData={setData} />
                        </div>
                        <div className="px-6">
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 p-6 flex-col">
                        <div className="flex flex-col flex-1">
                            {previews.length > 0 ? (
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {previews.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-full h-full object-cover rounded shadow"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-1 flex-col justify-center items-center text-xl gap-2 text-gray-400">
                                    <i class="bi bi-card-image text-6xl"></i>
                                    Nothing to see here… yet.
                                </div>
                            )}
                        </div>
                        <Dropzone
                            onDrop={(acceptedFiles) => {
                                if (
                                    data.media.length + acceptedFiles.length >
                                    8
                                ) {
                                    toast.error(
                                        "You can upload up to 8 images."
                                    );
                                    return;
                                }

                                setData("media", [
                                    ...data.media,
                                    ...acceptedFiles,
                                ]);
                            }}
                            accept={{
                                "image/jpeg": [".jpeg", ".jpg"],
                                "image/png": [".png"],
                            }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section className="flex flex-1">
                                    <div
                                        {...getRootProps()}
                                        className="flex flex-1 items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer"
                                    >
                                        <input {...getInputProps()} />
                                        <div className="flex flex-col text-lg items-center text-gray-700">
                                            <i className="bi bi-cloud-arrow-up text-6xl"></i>
                                            Drag and drop, or click to upload
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <InputError message={errors.media} />
                    </div>
                </div>
                <div className="flex justify-end border-t border-gray-300 p-4 gap-x-4">
                    <Link href={route("profile.index", auth.user.username)}>
                        <SecondaryButton>
                            <span className="text-base">Cancel</span>
                        </SecondaryButton>
                    </Link>
                    <PrimaryButton disabled={loading}>
                        <span className="text-base">Publish</span>
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

function Toolbar({ setData }) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            import("quill").then((Quill) => {
                quillRef.current = new Quill.default(editorRef.current, {
                    modules: {
                        toolbar: "#toolbar",
                    },
                    theme: "snow",
                    placeholder: "Start writing your post here...",
                });

                quillRef.current.on("text-change", () => {
                    setData("description", quillRef.current.root.innerHTML);
                });
            });
        }

        return () => {
            quillRef.current = null;
        };
    }, []);
    return (
        <div className="flex flex-1 flex-col">
            <div
                id="toolbar"
                className="rounded-t-md p-3 bg-white shadow flex flex-wrap gap-x-2"
            >
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                </span>
                <span className="ql-formats">
                    <select className="ql-color" />
                </span>
                <span className="ql-formats">
                    <select className="ql-header" defaultValue={0}>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="0"></option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-script" value="super" />
                    <button className="ql-script" value="sub" />
                </span>
                <span className="ql-formats">
                    <button className="ql-blockquote" />
                    <button className="ql-code-block" />
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                </span>
                <span className="ql-formats">
                    <button className="ql-clean" />
                </span>
            </div>

            <div
                id="editor"
                ref={editorRef}
                className="bg-white border border-t-0 border-gray-300 rounded-b-md max-h-[calc(100vh-32rem)]"
            ></div>
        </div>
    );
}
