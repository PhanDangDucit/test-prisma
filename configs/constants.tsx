export const initialState = { message: null || "", errors: {} };


export const user = {
    id: 0,
    fullname: null,
    username: null,
    password: null,
    avatar: null,
    created_at: null,
    updated_at: null,
    phone: null,
    email: '',
    role: null
}

export const comment = {
    id: 0,
    content: '',
    user_id: 0,
    like_count: 0,
    post_id: 0,
    parent_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
    subcomment_count: 0
}

export const post = {
    id:0,
    title:'',
    created_at:new Date(),
    updated_at:new Date(),
    content:'',
    thumbnail:'',
    post_type_id:0,
    slug:'',
    is_show: '',
    author_id: 0,
    comment_count: 0
}