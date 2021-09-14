export const createFileParams = (file: File, msgType: string) => {
  switch (msgType) {
    case "audio":
      return {
        duration: 312,
        url: "abc@abc.com",
      };

    case "video":
      return {
        size: "281 kB",
        orientation: "landscape",
        duration: "00:15",
        thumbnail:
          "https://firebasestorage.googleapis.com/v0/b/my-portfolio-15c91.appspot.com/o/temp%2Fthumbnailvid1-min.png?alt=media&token=ccd32251-9bac-443b-83e8-fa5e1c776956",
        url: "https://storage.coverr.co/videos/YMcI3HlMOuSf6T1DDQOGzSQhUlobNQGh?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjI3ODM0NTcyfQ.vR71qiS6CRn4_pr1HUeVohCefPII5fzznL4lX-lkGtI",
      };

    case "image":
      return {
        orientation: "landscape",
        size: "131 kB",
        thumbnail:
          "https://firebasestorage.googleapis.com/v0/b/my-portfolio-15c91.appspot.com/o/temp%2F2.jpg?alt=media&token=3fc8d7fa-acd0-4824-8901-284ad71d7174",
        url: "https://images.unsplash.com/photo-1627573002203-abedce71ddb6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      };

    case "document":
      return {
        fileName: file.name,
        fileSize: file.size,
        url: null,
      };
  }
};
