"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp, Loader2, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import api from "~/lib/axios";

const imageUploadSchema = z.object({
  image: z
    .custom<FileList>(
      (value) => value instanceof FileList,
      "Please select an image"
    )
    .refine((files) => files && files.length === 1, {
      message: "Please select one image.",
    })
    .refine(
      (files) =>
        files &&
        Array.from(files).every((file) => file.type.startsWith("image/")),
      {
        message: "The file must be an image.",
      }
    ),
  uploadType: z.enum(["single", "group"], {
    required_error: "Please select if this is for one student or a group",
  }),
});

type ImageUploadSchema = z.infer<typeof imageUploadSchema>;

interface ImageUploadSessionProps {
  sessionId: number;
}

export default function ImageUploadSession({
  sessionId,
}: ImageUploadSessionProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<ImageUploadSchema>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      uploadType: "single",
    },
  });

  const API_ENDPOINT = `${import.meta.env.VITE_API_URL_DETECTION}/students/add`;

  const uploadType = watch("uploadType");

  useEffect(() => {
    if (selectedFileName) {
      setValue("image", fileInputRef.current?.files as FileList);
      trigger("image");
    }
  }, [selectedFileName, setValue, trigger]);

  const onSubmit: SubmitHandler<ImageUploadSchema> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("sessionId", sessionId.toString());
    formData.append("upload_type", data.uploadType);

    // Append the file to formData
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await api.post(API_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", response.data);
      toast({
        title: "Success",
        description: `Image uploaded successfully for ${
          data.uploadType === "single" ? "student" : "group"
        } with ID: ${sessionId}.`,
      });
      setOpen(false);
      reset();
      setSelectedFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileName(files[0].name);
    } else {
      setSelectedFileName(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ImageUp className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Student Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-4">
              <Label
                htmlFor="image"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
              >
                <UploadIcon className="h-5 w-5 text-gray-400" />
                <span>
                  {selectedFileName ? selectedFileName : "Select a file"}
                </span>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  {...register("image")}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </Label>
            </div>
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Upload Type</Label>
            <RadioGroup
              value={uploadType}
              onValueChange={(value) =>
                setValue("uploadType", value as "single" | "group")
              }
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Single Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group">Group of Students</Label>
              </div>
            </RadioGroup>
            {errors.uploadType && (
              <p className="text-sm text-red-500">
                {errors.uploadType.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
