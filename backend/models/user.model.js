import mongoose from 'mongoose';

const userSchema = new mongoose.Schema ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Recruiter'],
        required: true
    },
    profie: {
        bio: String,
        skills: [{type: String}],
        resume: {type: String},
        resumeOriginalName: {type: String},
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        profilePhoto:  {
            type: String,
            default: ""
        }
    }
}, {timestamps: true});
export const User = mongoose.mode('User', userSchema);
