import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/Layout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";

export default function PostCreate() {
    const { auth } = usePage().props;
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
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={{
                icon: <i className="bi bi-plus-circle"></i>,
                title: "Create Post",
            }}
        >
            <Head title="Create" />
            <link
                href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css"
                rel="stylesheet"
            />
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="flex flex-col flex-1 py-20 px-28"
            >
                <div className="border-b border-gray-300 p-4">
                    <h2 className="text-3xl text-gray-700">Create Post</h2>
                    <InputError message={errors.content} className="mt-2" />
                </div>
                <div className="flex flex-1">
                    <div className="flex flex-1 basis-2/12 justify-start flex-col border-r border-gray-300 py-4">
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
                            {data.media.length > 0 && (
                                <ul className="text-sm text-gray-700">
                                    {data.media.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Dropzone
                            onDrop={(acceptedFiles) =>
                                setData("media", [
                                    ...data.media,
                                    ...acceptedFiles,
                                ])
                            }
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
            <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
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
    }, []);
    return (
        <div className="flex flex-1 flex-col">
            <div
                id="toolbar"
                className="rounded-t-md p-3 bg-white shadow flex flex-wrap gap-x-2"
            >
                <span className="ql-formats space-x-2">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                </span>
                <span className="ql-formats">
                    <select className="ql-header">
                        <option value="2"></option>
                        <option value="3"></option>
                        <option selected></option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered" />
                    <button className="ql-list" value="bullet" />
                </span>
            </div>

            <div
                id="editor"
                ref={editorRef}
                className="bg-white border border-t-0 border-gray-300 rounded-b-md"
            ></div>
        </div>
    );
}
