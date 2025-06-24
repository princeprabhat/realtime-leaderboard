import mongoose from "mongoose";


const playerSchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\S{5,}$/.test(v);
            },
            message: props => `${props.value} is not a valid playerId`
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    region: {
        type: String,
        required: true,
    },
    gameMode: {
        type: String,
        required: true,
        enum: ['solo', 'duo', 'squad'],
    },
    score: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

playerSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

playerSchema.index({ region: 1, gameMode: 1, score: -1 });

const Player = mongoose.model('Player', playerSchema);

export default Player;