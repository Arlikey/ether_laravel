import "quill/dist/quill.snow.css";
import PostImages from "./PostImages";
import UserAvatar from "../User/UserAvatar";
import LikeButton from "./LikeButton";
import { useEffect, useState, useCallback } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import SaveButton from "./SaveButton";
import { getRelativeDate } from "@/dataFormatting";
import Dropdown from "../Dropdown";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../Modal";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";

function PostHeader({ user, createdAt }) {
    return (
        <div className="flex items-center gap-2">
            <Link
                href={route("profile.index", user.slug)}
                className="flex gap-3 items-center"
            >
                <UserAvatar
                    size={36}
                    avatar={user.profile?.avatar}
                    alt={user.username}
                />
                <span className="font-bold">{user.username}</span>
            </Link>
            <div className="rounded-full w-1 h-1 bg-gray-500"></div>
            <span className="text-gray-600">{getRelativeDate(createdAt)}</span>
        </div>
    );
}

function PostDropdown({ postId, canDelete, onDeleteClick }) {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    className="text-xl text-gray-700 cursor-pointer hover:scale-110 hover:text-gray-900 active:text-gray-700 transition duration-100"
                    aria-label="Post options"
                >
                    <i className="bi bi-three-dots"></i>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Link href={route("posts.show", postId)} as="button">
                    Go to Post
                </Dropdown.Link>
                {canDelete && (
                    <Dropdown.Link
                        onClick={onDeleteClick}
                        as="button"
                        className="flex text-red-600 gap-2"
                    >
                        <i className="bi bi-trash3"></i>Delete
                    </Dropdown.Link>
                )}
            </Dropdown.Content>
        </Dropdown>
    );
}

function CommentList({ comments }) {
    return (
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="flex gap-2 items-start border-t px-2 pt-2"
                >
                    <Link
                        href={route("profile.index", comment.user.slug)}
                        className="flex gap-2 items-start flex-shrink-0"
                    >
                        <UserAvatar
                            size={32}
                            avatar={comment.user.profile?.avatar}
                            alt={comment.user.username}
                        />
                    </Link>

                    <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                            <Link
                                href={route("profile.index", comment.user.slug)}
                                className="font-semibold"
                            >
                                {comment.user.username}
                            </Link>
                            <span className="text-sm text-gray-600">
                                {getRelativeDate(comment.created_at)}
                            </span>
                        </div>
                        <div className="text-gray-700">
                            {comment.comment_text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CommentInput({ user, value, onChange, onSubmit, loading }) {
    return (
        <div className="flex gap-2 items-center border-t pt-4">
            <UserAvatar
                size={32}
                avatar={user.profile?.avatar}
                alt={user.username}
            />
            <TextInput
                id="comment_text"
                type="text"
                name="comment_text"
                className="flex-1 border rounded-lg px-4 py-2"
                placeholder="Write a comment..."
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit();
                    }
                }}
            />
            <button
                disabled={loading}
                onClick={onSubmit}
                className="px-4 py-2 rounded-lg text-purple-600 hover:scale-105 hover:text-purple-700 disabled:text-purple-400 transition duration-100"
                aria-label="Send comment"
            >
                <i className="bi bi-send text-xl"></i>
            </button>
        </div>
    );
}

export default function Post({ post: initialPost, className = "" }) {
    const { auth } = usePage().props;

    const [post, setPost] = useState(initialPost);
    const [comments, setComments] = useState(initialPost.comments || []);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);

    useEffect(() => {
        setPost(initialPost);
        setComments(initialPost.comments || []);
    }, [initialPost]);

    const handleLikeChange = useCallback((isLiked) => {
        setPost((prev) => ({
            ...prev,
            isLikedBy: isLiked,
            likesCount: prev.likesCount + (isLiked ? 1 : -1),
        }));
    }, []);

    const handleSaveChange = useCallback((isSaved) => {
        setPost((prev) => ({
            ...prev,
            isSavedBy: isSaved,
        }));
    }, []);

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            await axios.delete(route("posts.destroy", post.id));
            router.visit(route("home"));
        } catch (error) {
            toast.error("Failed to delete post");
            setIsDeleting(false);
        }
    };

    const handleCopyLink = useCallback(() => {
        const url = route("posts.show", post.id);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(url)
                .then(() => toast.success("Link copied!"))
                .catch(() => toast.error("Failed to copy link"));
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
                toast.success("Link copied!");
            } catch (err) {
                toast.error("Failed to copy link.");
            }
            document.body.removeChild(textArea);
        }
    }, [post.id]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || isCommenting) return;
        setIsCommenting(true);
        try {
            const res = await axios.post(route("comments.store", post.id), {
                comment_text: newComment,
            });
            setComments((prev) => [...prev, res.data.comment]);
            setNewComment("");
        } catch (error) {
            toast.error("Failed to post comment");
        } finally {
            setIsCommenting(false);
        }
    };

    return (
        <div
            className={`w-full max-w-[680px] flex flex-col items-start gap-4 sm:rounded-2xl sm:shadow-md bg-white p-4 sm:p-6 pb-0 sm:pb-0 h-fit mx-auto ${className}`}
        >
            <div className="flex flex-wrap justify-between items-center w-full gap-2">
                <PostHeader user={post.user} createdAt={post.created_at} />
                <PostDropdown
                    postId={post.id}
                    canDelete={auth.user?.id === post.user.id}
                    onDeleteClick={(e) => {
                        e.preventDefault();
                        setShowDeleteModal(true);
                    }}
                />
            </div>

            <div className="flex flex-col w-full gap-4 overflow-y-auto">
                {post.title && (
                    <div className="text-2xl sm:text-3xl font-bold">
                        {post.title}
                    </div>
                )}
                {post.media?.length > 0 && <PostImages images={post.media} />}
                {post.description && (
                    <div
                        className="ql-editor prose prose-neutral w-full pl-1 sm:pl-2 text-base sm:text-lg"
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                )}
            </div>

            <div className="w-full flex flex-wrap justify-between items-center gap-4 text-gray-600">
                <div className="flex gap-4 sm:gap-6 items-center">
                    <div className="flex gap-2 items-center">
                        <span className="text-xl tabular-nums">
                            {post.likesCount}
                        </span>
                        <LikeButton
                            post={post}
                            isLiked={post.isLikedBy}
                            onLikeChange={handleLikeChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={() => setCommentsOpen((prev) => !prev)}
                        aria-label="Show comments"
                    >
                        <span className="text-xl tabular-nums">
                            {comments.length}
                        </span>
                        <i className="bi bi-chat-dots text-xl"></i>
                    </button>
                    <div className="flex items-center">
                        <SaveButton
                            post={post}
                            isSaved={post.isSavedBy}
                            onSaveChange={handleSaveChange}
                        />
                    </div>
                </div>
                <div className="flex gap-4 sm:gap-6">
                    <button
                        type="button"
                        className="flex items-center text-xl text-gray-700 cursor-pointer hover:scale-110 hover:text-gray-900 active:text-gray-700 transition duration-100"
                        onClick={handleCopyLink}
                        aria-label="Copy post link"
                    >
                        <i className="bi bi-link-45deg"></i>
                    </button>
                </div>
            </div>

            <div
                className={`w-full transition-all duration-300 overflow-hidden ${
                    commentsOpen
                        ? "max-h-[80vh] opacity-100 pb-6"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="w-full flex flex-col gap-4">
                    <CommentList comments={comments} />
                    {auth.user && (
                        <CommentInput
                            user={auth.user}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onSubmit={handleCommentSubmit}
                            loading={isCommenting}
                        />
                    )}
                </div>
            </div>

            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                maxWidth="sm"
            >
                <div className="flex flex-col p-4 gap-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Delete Post</h2>
                    </div>
                    <div>Are you sure you want to delete this post?</div>
                    <div className="flex justify-end gap-2">
                        <SecondaryButton
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            disabled={isDeleting}
                            onClick={handleDelete}
                        >
                            Delete
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
