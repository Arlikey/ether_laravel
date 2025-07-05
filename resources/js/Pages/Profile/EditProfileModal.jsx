import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import UserAvatar from "@/Components/User/UserAvatar";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditProfileModal({ edit, setEdit, user, setUser }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { data, setData } = useForm({
        fullname: user.profile.fullname || "",
        bio: user.profile.bio || "",
        avatar: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("bio", data.bio);
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }
        formData.append("_method", "PATCH");

        try {
            const response = await axios.post(
                route("profile.update"),
                formData
            );
            setUser({ ...user, profile: response.data.profile });
            toast.success("Profile successfully updated!");
            setEdit(false);
            router.reload();
        } catch (error) {
            setErrors(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    return (
        <Modal
            show={edit}
            onClose={() => setEdit(false)}
            enctype="multipart/form-data"
        >
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <div className="flex">
                    <div className="relative mr-4 group rounded-full shadow-md max-w-44">
                        <UserAvatar
                            size={176}
                            avatar={
                                avatarPreview ||
                                (user.profile.avatar
                                    ? `/storage/${user.profile.avatar}`
                                    : null)
                            }
                            isBlob={true}
                        />
                        <input
                            type="file"
                            accept="image/.jpeg,.jpg,.png,.webp"
                            className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const allowedTypes = [
                                        "image/jpeg",
                                        "image/jpg",
                                        "image/png",
                                        "image/webp",
                                    ];
                                    if (!allowedTypes.includes(file.type)) {
                                        toast.error(
                                            "Invalid file type. Only JPEG, PNG, or WEBP images are allowed."
                                        );
                                        return;
                                    }
                                    setData("avatar", file);
                                    setAvatarPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        <div className="opacity-0 pointer-events-none absolute inset-0 bg-black bg-opacity-50 text-white text-xl flex items-center justify-center rounded-full transition-opacity duration-100 group-hover:opacity-100">
                            <i className="bi bi-pencil text-3xl"></i>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-around">
                        <div>
                            <InputLabel htmlFor="fullname" value="Full name" />
                            <TextInput
                                id="fullname"
                                type="text"
                                name="fullname"
                                value={data.fullname}
                                className="mt-1 block w-full"
                                placeholder="Full name"
                                autoComplete="fullname"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("fullname", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.fullname}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="bio" value="Bio" />
                            <TextInput
                                id="bio"
                                type="text"
                                name="bio"
                                value={data.bio}
                                className="mt-1 block w-full"
                                placeholder="Bio"
                                autoComplete="bio"
                                onChange={(e) => setData("bio", e.target.value)}
                            />
                            <InputError message={errors.bio} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <InputError message={errors.avatar} className="mt-2" />
                    <div className="flex flex-1 gap-4 justify-end">
                        <SecondaryButton
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            as="button"
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
