interface IIFrameProps {
    file: string;
    title: string;
    percentWidth: string;
    percentHeight: string;
}


export const IFrame = ({title, file, percentWidth, percentHeight}: IIFrameProps) => {


    return (
      <iframe
        width='100%'
        height='100%'
        src={file}
        allowFullScreen
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        id="class"
      ></iframe>
    );
}