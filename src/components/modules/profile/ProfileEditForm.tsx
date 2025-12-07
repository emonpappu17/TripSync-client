"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import Image from "next/image";
import { X } from "lucide-react";
import { updateUserProfile } from "@/services/user";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/types/user.interface";
import { redirect } from "next/navigation";

export default function ProfileEditForm({ user }: { user: IUser }) {
    // const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const MAX_FILE_SIZE = 500 * 1024; // 500KB


    const [interests, setInterests] = useState<string[]>(user?.interests || []);
    const [visitedCountries, setVisitedCountries] = useState<string[]>(user?.visitedCountries || []);
    const [newInterest, setNewInterest] = useState("");
    const [newCountry, setNewCountry] = useState("");

    const [selectedFile, setSelectedFile] = useState<File | string | null>(user?.profileImage || null);
    const [fileError, setFileError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [state, formAction, isPending] = useActionState(updateUserProfile, null);

    // -------------------
    // FILE UPLOAD HANDLER
    // -------------------
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setFileError("Image must be smaller than 500KB.");
            e.target.value = "";
            setSelectedFile(null);
            return;
        }

        setFileError("");
        setSelectedFile(file);
    };

    // -------------------
    // INTERESTS HANDLERS
    // -------------------
    const addInterest = () => {
        const clean = newInterest.trim();
        if (clean && !interests.includes(clean)) {
            setInterests((prev) => [...prev, clean]);
            setNewInterest("");
        }
    };

    const removeInterest = (value: string) => {
        setInterests((prev) => prev.filter((i) => i !== value));
    };

    // -------------------
    // COUNTRIES HANDLERS
    // -------------------
    const addCountry = () => {
        const clean = newCountry.trim();
        if (clean && !visitedCountries.includes(clean)) {
            setVisitedCountries((prev) => [...prev, clean]);
            setNewCountry("");
        }
    };

    const removeCountry = (value: string) => {
        setVisitedCountries((prev) => prev.filter((c) => c !== value));
    };

    useEffect(() => {
        if (state?.success === false) toast.error(state.message);
        if (state?.success === true) {
            toast.success("Profile updated successfully!");
            redirect("/profile")
        }

    }, [state]);


    // console.log({ state });
    return (
        <form action={formAction} className="flex flex-col space-y-6">
            {/* Image Preview */}
            <div className="flex flex-col items-center gap-2">
                {selectedFile ? (
                    <Image
                        src={typeof selectedFile === "string" ? selectedFile : URL.createObjectURL(selectedFile)}
                        width={96}
                        height={96}
                        className="rounded-full size-24 object-cover"
                        alt="Preview"
                    />
                ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full" />
                )}

                <div className="w-full">
                    <label className="font-medium text-sm">Profile Image</label>
                    <Input
                        ref={fileInputRef}
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1"
                    />
                    {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
                </div>
            </div>

            {/* FULL NAME */}
            <div>
                <label className="font-medium text-sm">Full Name</label>
                <Input name="fullName" defaultValue={user?.fullName || ""} className="mt-1" />
                <InputFieldError state={state} field="fullName" />
            </div>

            {/* LOCATION */}
            <div>
                <label className="font-medium text-sm">Current Location</label>
                <Input name="currentLocation" defaultValue={user?.currentLocation || ""} className="mt-1" />
                <InputFieldError state={state} field="currentLocation" />
            </div>

            {/* PHONE */}
            <div>
                <label className="font-medium text-sm">Phone Number</label>
                <Input name="phone" defaultValue={user?.phone || ""} className="mt-1" />
                <InputFieldError state={state} field="phone" />
            </div>

            {/* BIO */}
            <div>
                <label className="font-medium text-sm">Bio</label>
                <Textarea name="bio" defaultValue={user?.bio || ""} className="mt-1" />
                <InputFieldError state={state} field="bio" />
            </div>

            {/* INTERESTS */}
            <div>
                <label className="font-medium text-sm">Interests</label>
                <div className="flex gap-2 mt-1">
                    <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add interest"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addInterest();
                            }
                        }}
                    />
                    <Button type="button" onClick={addInterest}>Add</Button>
                </div>

                {/* Hidden inputs synced with state */}
                {interests.map((i) => (
                    <input key={i} type="hidden" name="interests" value={i} />
                ))}

                <div className="flex flex-wrap mt-2 gap-2">
                    {interests.map((i) => (
                        <Badge variant={"secondary"} key={i} className="flex items-center gap-1">
                            {i}
                            <button
                                type="button"
                                onClick={() => removeInterest(i)}
                                className="ml-1 text-red-500 hover:text-red-700"
                            >
                                <X size={12} />
                            </button>
                        </Badge>
                    ))}
                </div>
            </div>

            {/* VISITED COUNTRIES */}
            <div>
                <label className="font-medium text-sm">Visited Countries</label>
                <div className="flex gap-2 mt-1">
                    <Input
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        placeholder="Add country"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addCountry();
                            }
                        }}
                    />
                    <Button type="button" onClick={addCountry}>Add</Button>
                </div>

                {/* Hidden inputs synced with state */}
                {visitedCountries.map((c) => (
                    <input key={c} type="hidden" name="visitedCountries" value={c} />
                ))}

                <div className="flex flex-wrap mt-2 gap-2">
                    {visitedCountries.map((c) => (
                        <Badge variant={"secondary"} key={c} className="flex items-center gap-1">
                            {c}
                            <button
                                type="button"
                                onClick={() => removeCountry(c)}
                                className="ml-1 text-red-500 hover:text-red-700"
                            >
                                <X size={12} />
                            </button>
                        </Badge>
                    ))}
                </div>
            </div>


            {/* SUBMIT BUTTON */}
            <Button disabled={isPending} type="submit" className="mt-3">
                {isPending ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}
