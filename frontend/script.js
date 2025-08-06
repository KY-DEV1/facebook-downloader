function downloadVideo() {
      const url = document.getElementById("fbUrl").value;
        const result = document.getElementById("result");

          if (!url.includes("facebook.com")) {
              result.innerHTML = `<p style="color:red;">URL tidak valid!</p>`;
                  return;
                    }

                      const backendURL = "https://NAMA-PROJECT-VERCEL.vercel.app/api/fb?url=" + encodeURIComponent(url);

                        result.innerHTML = "Sedang memproses...";

                          fetch(backendURL)
                              .then((res) => res.json())
                                  .then((data) => {
                                        if (data.success && data.download_url) {
                                                result.innerHTML = `
                                                          <a href="${data.download_url}" target="_blank" download>
                                                                      <button>Download Video</button>
                                                                                </a>
                                                                                        `;
                                                                                              } else {
                                                                                                      result.innerHTML = `<p style="color:red;">Gagal mendapatkan video 😢</p>`;
                                                                                                            }
                                                                                                                })
                                                                                                                    .catch((err) => {
                                                                                                                          result.innerHTML = `<p style="color:red;">Terjadi kesalahan server!</p>`;
                                                                                                                              });
                                                                                                                              }
}