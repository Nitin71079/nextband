export default async function handler(
req,
res
) {
return res.status(200).json({
success: true,
audioUrl:
"/listening/section1.mp3",
});
}
