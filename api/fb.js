import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const { url } = req.query;

    if (!url || !url.includes("facebook.com")) {
        return res.status(400).json({ success: false, message: "URL tidak valid" });
          }

            try {
                const response = await axios.get(url, {
                      headers: {
                              "User-Agent": "Mozilla/5.0"
                                    }
                                        });

                                            const matches = response.data.match(/"playable_url":"(.*?)"/);

                                                if (matches && matches[1]) {
                                                      const cleanUrl = matches[1]
                                                              .replace(/\\u0025/g, '%')
                                                                      .replace(/\\u0026/g, '&')
                                                                              .replace(/\\\//g, '/');
                                                                                    return res.status(200).json({ success: true, download_url: cleanUrl });
                                                                                        } else {
                                                                                              return res.status(404).json({ success: false, message: "Video tidak ditemukan atau tidak public" });
                                                                                                  }
                                                                                                    } catch (err) {
                                                                                                        return res.status(500).json({ success: false, message: "Gagal fetch halaman Facebook" });
                                                                                                          }
                                                                                                          }