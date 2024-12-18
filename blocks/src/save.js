import { useBlockProps, RichText } from '@wordpress/block-editor';

const SaveComponent = ({ attributes }) => {
    const { plans } = attributes;

    return (
        <div {...useBlockProps.save()} className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {plans.map((plan, index) => (
                <div key={index} className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        {/* Card Header */}
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">
                                <RichText.Content value={plan.title} />
                            </h4>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                            {/* Price */}
                            <h1 className="card-title pricing-card-title">
                                <RichText.Content value={plan.price} />
                                <small className="text-muted fw-light">/mo</small>
                            </h1>

                            {/* Features */}
                            <ul className="list-unstyled mt-3 mb-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>{feature}</li>
                                ))}
                            </ul>

                            {/* Button */}
                            <button type="button" className="w-100 btn btn-lg btn-outline-primary">
                                <RichText.Content value={plan.buttonLabel} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SaveComponent;
