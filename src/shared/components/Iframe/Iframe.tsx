interface IIFrameProps {
    file: string;
    title: string;
    percent: string;
}


export const IFrame = ({title, file, percent}: IIFrameProps) => {
    return (
      <iframe
        width={percent}
        height={percent}
        src={file}
        allowFullScreen
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    );
}