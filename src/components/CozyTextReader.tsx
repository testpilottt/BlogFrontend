
interface CozyTextReaderProps {
    text: string;
    title: string;
}

const CozyTextReader = ({title, text}: CozyTextReaderProps) => {
    return (
        <div className="container-fluid" style={{ padding: '0', marginTop: '50px' }}>
            <div className="row">
                <div className="col">
                    <div className="card" style={{ backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                        <div className="card-body" style={{ padding: '2rem' }}>
                            <h5 className="card-title" style={{ fontSize: '1.8rem', fontWeight: '600', color: '#5a4d3a', marginBottom: '20px' }}>
                                {title}
                            </h5>
                            <p className="card-text" style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#6a5b4e', textAlign: 'justify' }}>
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CozyTextReader;
