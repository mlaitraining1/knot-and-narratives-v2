/* ==========================================================================
   CLIENT GALLERY CODES
   ==========================================================================
   Add one line per client here. When they type their code into the Client
   Gallery page, this is what looks up which Google Drive folder to send
   them to.

   HOW TO ADD A NEW CLIENT:
   1. Create their folder in Google Drive, upload their photos/videos.
   2. Right-click the folder → Share → General access → "Anyone with the link"
      → Viewer. Copy the link.
   3. Pick a short code for them (e.g. their name + year: "PRIYA2026").
      Codes are automatically read in UPPERCASE, so it doesn't matter how
      the client types it.
   4. Add a new line below, following the exact same pattern as the example.
      Don't forget the comma at the end of each line except the last one.
   5. Save this file, commit, push. That's it — no other file needs to change.

   IMPORTANT — read this once:
   This is a simple, friendly way to hand out private gallery links, not a
   secure login system. Anyone who inspects this file in their browser can
   technically see every code and every link listed here (not just their
   own). For wedding photos this is the same trust level as sending someone
   an unlisted link directly — which is exactly what's happening under the
   hood. If you ever need to revoke access to a specific client, just
   delete their line here (or change the Drive folder's sharing setting)
   and push again.
   ========================================================================== */

window.CLIENT_GALLERIES = {

  "DEMO2026": {
    name: "Priya & Nikhil — Sample Gallery",
    url: "https://drive.google.com/drive/folders/REPLACE_WITH_REAL_FOLDER_ID"
  },

  "MOU2026": {
    name: "Mou & Sandeep",
    url: "https://drive.google.com/drive/folders/1c6YZide6lVMNx0lm3GOaZWvwXSs_I8hb"
  }
  
   
   // Add new clients above this line, like:
  // ,"MOU2026": {
  //   name: "Mou & Sandeep",
  //   url: "https://drive.google.com/drive/folders/1c6YZide6lVMNx0lm3GOaZWvwXSs_I8hb"
  // }

};
