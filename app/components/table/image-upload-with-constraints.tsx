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
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp, Loader2, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/hooks/use-toast";
import api from "~/lib/axios";

const imageUploadSchema = z.object({
  images: z
    .custom<FileList>(
      (value) => value instanceof FileList,
      "Please select images"
    )
    .refine(
      (files) =>
        files &&
        Array.from(files).every((file) => file.type.startsWith("image/")),
      {
        message: "All files must be images.",
      }
    ),
});

type ImageUploadSchema = z.infer<typeof imageUploadSchema>;

interface ImageUploadWithStudentIdProps {
  studentId: number;
}

export default function ImageUploadWithStudentId({
  studentId,
}: ImageUploadWithStudentIdProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<ImageUploadSchema>({
    resolver: zodResolver(imageUploadSchema),
  });

  const API_ENDPOINT = `${import.meta.env.VITE_API_URL_DETECTION}/students/add`;

  useEffect(() => {
    if (selectedFiles) {
      setValue("images", selectedFiles);
      trigger("images");
    }
  }, [selectedFiles, setValue, trigger]);

  const onSubmit: SubmitHandler<ImageUploadSchema> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("student_id", studentId.toString());
    Array.from(data.images).forEach((file, index) => {
      formData.append(`image${index + 1}`, file);
    });

    try {
      const response = await api.post(API_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", response.data);
      toast({
        title: "Success",
        description: `${data.images.length} images uploaded successfully for student ID: ${studentId}.`,
      });
      setOpen(false);
      reset();
      setSelectedFiles(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Upload Images <ImageUp className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Student Images</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="images">Images (3-5)</Label>
            <div className="flex items-center gap-4">
              <Label
                htmlFor="images"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
              >
                <UploadIcon className="h-5 w-5 text-gray-400" />
                <span>
                  {selectedFiles
                    ? `${selectedFiles.length} file(s) selected`
                    : "Select 3-5 files"}
                </span>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  {...register("images")}
                  onChange={handleFileChange}
                />
              </Label>
            </div>
            {errors.images && (
              <p className="text-sm text-red-500">{errors.images.message}</p>
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
