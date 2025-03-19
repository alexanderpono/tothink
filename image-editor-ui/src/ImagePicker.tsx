import React, { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';

// || defaultPlaceHolder
const ImagePreview: React.FC<{
    src: string;
    storageUrl: string;
    onClick?: MouseEventHandler<HTMLElement>;
    placeHolderUrl?: string;
    w?: number;
    h?: number;
    round?: boolean;
}> = ({ src, onClick, placeHolderUrl, w, h, round, storageUrl }) => {
    if (!src && placeHolderUrl === null) {
        return null;
    }
    w = w ?? 56;
    h = h && 56;
    return (
        <div
            className="previewWrapper"
            onClick={onClick}
            style={{ width: w + 'px', height: h + 'px', borderRadius: round ? '1000px' : 'none' }}
        >
            {src ? (
                <img className="preview" src={storageUrl + src} />
            ) : (
                <img src={placeHolderUrl} />
            )}
        </div>
    );
};

const defaultExtensions = ['png', 'jpg', 'jpeg'];
const defaultMaxImgSize = 2 ** 20; //1 MB

export const ImagePicker: React.FC<{
    imgPath: string;
    storageUrl: string;
    setImgPath: (imgPath: string) => void;
    w?: number;
    h?: number;
    placeHolderUrl?: string;
    round?: boolean;
    extensions?: string[];
    maxSizeBytes?: number;
    hint?: string;
}> = ({
    imgPath,
    setImgPath,
    w,
    h,
    placeHolderUrl,
    round,
    extensions,
    maxSizeBytes,
    hint,
    storageUrl
}) => {
    extensions = extensions ?? defaultExtensions;
    maxSizeBytes = maxSizeBytes ?? defaultMaxImgSize;

    const [img, setImg] = React.useState(imgPath);

    useEffect(() => {
        setImgPath(img);
    }, [img]);

    const filePickerRef = React.useRef<HTMLInputElement>(null);

    const onUploadClick: MouseEventHandler<HTMLElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        filePickerRef.current.click();
    };

    const onClearClick: MouseEventHandler<HTMLElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setImg(undefined);
    };
    const onFileSelected: ChangeEventHandler<HTMLInputElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const file = e.currentTarget.files[0];
            e.currentTarget.value = null;

            const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();

            if (!extensions.includes(fileExt)) {
                throw 'Unsupported extension';
            }

            if (file.size > maxSizeBytes) {
                throw 'Too large file';
            }

            const data = new FormData();
            data.append('file', file, file.name);

            let url: string;
            try {
                // const {result} = await api.uploadFile(data);

                // url = result.url;
                url = 'aaa.txt';
            } catch (err) {
                throw 'File upload error';
            }
            setImg(url);
        } catch (err) {
            console.error('Error uploading image ' + err);
        }
        setImg(undefined);
    };
    return (
        <div className="container">
            <ImagePreview
                src={img}
                onClick={onUploadClick}
                w={w}
                h={h}
                placeHolderUrl={placeHolderUrl}
                round={round}
                storageUrl={storageUrl}
            />
            <div className="controls">
                <input
                    type="file"
                    accept={extensions.map((e) => '.' + e).join(',')}
                    ref={filePickerRef}
                    onChange={onFileSelected}
                ></input>
                <div className="buttons">
                    <button onClick={onUploadClick}>Load</button>
                    {img && <button onClick={onClearClick}>Clear</button>}
                </div>
            </div>
            {hint && <span>{hint}</span>}
        </div>
    );
};
