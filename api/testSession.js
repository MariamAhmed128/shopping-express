export default function handler(req, res) {
  if (req.session?.views) {
    req.session.views++;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session = { views: 1 };
    res.send('Welcome! First visit.');
  }
}