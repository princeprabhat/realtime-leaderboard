const blockWrites = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: 'Write operations are disabled on the live demo' });
    }
    next();
};

export default blockWrites;