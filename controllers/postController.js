import Post from '../models/post';

// 1. Create Post
export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user_id = req.decoded.id;

        const newPost = new Post({
            title,
            description,
            user_id,
        });

        const savedPost = await newPost.save();
        res.status(201).send({message:'post create success',savedPost});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Post list
export const getPosts = async (req, res) => {
    try {
        const id = req.params.id;
        const posts = await Post.findById( id       );
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user_id');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Edit Post
export const editPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const user_id =  req.decoded.id;
        const _id = req.params.id;

        const updatedPost = await Post.findByIdAndUpdate(
            {_id:_id},
            {
                title,
                description,
                user_id,
            },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Delete Post
export const deletePost = async (req, res) => {
    try {
        const user_id =  req.decoded.id;
        const id = req.params.id;
        await Post.findOneAndDelete({ _id: id, user_id });
        res.status(200).send({message:'delete success'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



