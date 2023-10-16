class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <!-- Footer -->
			<section id="footer" class="wrapper">
				<div class="title">Contact</div>
					<div class="container">
						<section class="feature-list small">
							<div class="row">
								
								<div class="col-4 col-12-small">
									<section>
										<h3 class="icon solid fa-home">Address</h3>
										<p>
											IT University<br />
											Rued Langgaards vej 7,  2300 Copenhagen<br />
											Denmark
										</p>
									</section>
								</div>
								
								<div class="col-4 col-12-small">
									<section>
										<h3 class="icon solid fa-comment">Social</h3>
										<p>
										<a href="https://twitter.com/ALifeConf">Twitter</a><br />
										<a href="https://www.facebook.com/ALIFEconf/">Facebook</a>
										</p>
									</section>
								</div>

								<div class="col-4 col-12-small">
									<section>
										<h3 class="icon solid fa-envelope">Email</h3>
										<p>
										alife2024@itu.dk
										</p>
									</section>
								</div>
							</div>
						</section>

						</div>
					</div>
				</section>

		</div>
    `;
  }
}

customElements.define('footer-component', Footer);